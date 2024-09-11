from config import db
from datetime import datetime

class PostData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_name = db.Column(db.String(200), unique=False, nullable=False)
    post_content = db.Column(db.Text, unique=False, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def to_json(self):
        return{
            "id": self.id,
            "postName": self.post_name,
            "postContent": self.post_content,
            "Date": self.date_created
                }
