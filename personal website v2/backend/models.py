from config import db

class PostData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hot_like_count = db.Column(db.Integer, primary_key=False)
    cold_like_count = db.Column(db.Integer, primary_key=False)
    post_name = db.Column(db.String(200), unique=False, nullable=False)
    post_content = db.Column(db.Text, unique=False, nullable=False)
    
    def to_json(self):
        return{
            "id": self.id,
            "hotLikeCount": self.hot_like_count,
            "coldLikeCount": self.cold_like_count,
            "postName": self.post_name,
            "postContent": self.post_content,
                }
