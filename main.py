from flask import request, jsonify 
from config import app, db 
from models import PostData 
from flask_cors import cross_origin
from functools import wraps
import os
API_KEY = os.getenv('API_KEY')

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get("x-api-key")
        if api_key and api_key == API_KEY:
            return f(*args, **kwargs)
        else:
            return jsonify({"message": "Invalid or missing API key"}), 403
    return decorated_function



@app.route("/get_posts",methods=["GET"])
@cross_origin()
@require_api_key
def get_posts():
    posts = PostData.query.all()
    json_posts = list(map(lambda x: x.to_json(), posts))
    return jsonify({"posts": json_posts})

@app.route("/get_post/<int:post_id>", methods=["GET"])
@cross_origin()
@require_api_key
def get_post(post_id):
    post = PostData.query.get(post_id)
    if post is None:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({
        "id": post.id,
        "postName": post.post_name,
        "postContent": post.post_content,
        #"date": str(post.date) if post.date else None
    })

@app.route("/make_posts",methods=["POST"])
@cross_origin()
@require_api_key
def make_posts():
    post_name = request.json.get("postName")
    post_content = request.json.get("postContent")
    if not post_name or not post_content :
        return (jsonify({"message": "You must include a post name and post content"}), 400)
    new_post = PostData(post_name = post_name, post_content = post_content)
    try: 
        db.session.add(new_post)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message":"post created:"}),201

@app.route("/update_posts/<int:post_id>", methods=["PATCH"])
@cross_origin()
@require_api_key
def update_posts(post_id):
    post = PostData.query.get(post_id)
    if not post:
        return jsonify({"message": "post not found"}), 404
    data = request.json 
    post.post_name = data.get("postName", PostData.post_name)
    post.post_content = data.get("postContent", PostData.post_content)
    db.session.commit()
    return jsonify({"message": "post updated"}), 200

@app.route("/delete_post/<int:post_id>", methods=["DELETE"])
@cross_origin()
@require_api_key
def delete_post(post_id):
    post = PostData.query.get(post_id)
    if not post: 
        return jsonify({"message": "post not found"}), 404
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "deleted post"}), 200


if __name__=="__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
