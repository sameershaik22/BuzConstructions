import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
NOTIFICATION_EMAIL = os.getenv("NOTIFICATION_EMAIL", "info@buzconstruction.ca")


def send_email(to: str, subject: str, html_body: str) -> bool:
    if not SMTP_USER or not SMTP_PASS:
        print(f"[EMAIL SKIPPED] No SMTP credentials. Would send to: {to}, Subject: {subject}")
        return False
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = to
        msg.attach(MIMEText(html_body, "html"))
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to, msg.as_string())
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")
        return False


def notify_new_lead(name: str, email: str, phone: str, form_type: str, service: str):
    subject = f"🏗️ New {form_type.title()} Request — {name}"
    body = f"""
    <h2 style="color:#0A1628;">New {form_type.title()} from BUZ Website</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td><b>Name:</b></td><td>{name}</td></tr>
      <tr><td><b>Email:</b></td><td>{email}</td></tr>
      <tr><td><b>Phone:</b></td><td>{phone or 'N/A'}</td></tr>
      <tr><td><b>Service:</b></td><td>{service or 'Not specified'}</td></tr>
      <tr><td><b>Type:</b></td><td>{form_type}</td></tr>
    </table>
    <p><a href="http://localhost:3000/admin" style="background:#F5A623;color:#000;padding:10px 20px;text-decoration:none;border-radius:4px;">View in Admin Panel</a></p>
    """
    send_email(NOTIFICATION_EMAIL, subject, body)
    # Confirm to client
    client_body = f"""
    <h2 style="color:#0A1628;">Thank You, {name}!</h2>
    <p>We've received your {form_type} request and will contact you within <b>24 hours</b>.</p>
    <p><b>BUZ Construction Group Inc.</b><br>📞 +1 (416) 710-8200<br>✉️ info@buzconstruction.ca</p>
    """
    send_email(email, "We received your request — BUZ Construction", client_body)


def notify_new_contact(name: str, email: str, subject: str, message: str):
    body = f"""
    <h2>New Contact Message</h2>
    <p><b>From:</b> {name} ({email})</p>
    <p><b>Subject:</b> {subject or 'N/A'}</p>
    <p><b>Message:</b><br>{message}</p>
    """
    send_email(NOTIFICATION_EMAIL, f"📩 New Contact: {subject or name}", body)


def notify_new_application(name: str, email: str, position: str):
    subject = f"📋 New Job Application — {position}"
    body = f"""
    <h2>New Job Application</h2>
    <p><b>Applicant:</b> {name}</p>
    <p><b>Email:</b> {email}</p>
    <p><b>Position:</b> {position}</p>
    """
    send_email(NOTIFICATION_EMAIL, subject, body)
    # Auto-reply to applicant
    client_body = f"""
    <h2>Application Received — BUZ Construction</h2>
    <p>Dear {name},</p>
    <p>Thank you for applying for the <b>{position}</b> position at BUZ Construction Group Inc. We'll review your application and be in touch within 5-7 business days.</p>
    <p><b>BUZ Construction Group Inc.</b><br>careers@buzconstruction.ca</p>
    """
    send_email(email, "Application Received — BUZ Construction Group Inc.", client_body)
