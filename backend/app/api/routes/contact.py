from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.db_models import ContactSubmission as ContactSubmissionModel
from app.models.contact import ContactForm

router = APIRouter()


@router.post("/")
async def submit_contact(form_data: ContactForm, db: Session = Depends(get_db)):
    """Submit a contact/booking form"""
    db_submission = ContactSubmissionModel(
        name=form_data.name,
        email=form_data.email,
        phone=form_data.phone,
        event_type=form_data.event_type,
        message=form_data.message,
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return {"message": "Thank you for your message! We'll get back to you soon.", "id": str(db_submission.id)}


@router.get("/admin/submissions", response_model=List[ContactForm])
async def get_submissions(db: Session = Depends(get_db)):
    """Get all contact form submissions (admin only)"""
    submissions = db.query(ContactSubmissionModel).order_by(ContactSubmissionModel.created_at.desc()).all()
    return [sub.to_dict() for sub in submissions]


@router.patch("/admin/submissions/{submission_id}")
async def update_submission_status(submission_id: int, status: str, db: Session = Depends(get_db)):
    """Update submission status (admin only)"""
    submission = db.query(ContactSubmissionModel).filter(ContactSubmissionModel.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    submission.status = status
    db.commit()
    return {"message": "Status updated successfully"}


@router.delete("/admin/submissions/{submission_id}")
async def delete_submission(submission_id: int, db: Session = Depends(get_db)):
    """Delete a submission (admin only)"""
    submission = db.query(ContactSubmissionModel).filter(ContactSubmissionModel.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    db.delete(submission)
    db.commit()
    return {"message": "Submission deleted successfully"}
