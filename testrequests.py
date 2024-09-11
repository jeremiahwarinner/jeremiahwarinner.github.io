import requests 

apipath = "http://127.0.0.1:5000"
def get_posts_test():
    response = requests.get(apipath+"/get_posts")
    print(response.json())

def make_posts_test(post_name, post_content):
    package = {"postName": post_name, "postContent": post_content}
    response = requests.post(apipath+"/make_posts", json=package)
    print(package)
    return response

def update_posts_test(post_id, update_field, update_content):
    package = {update_field: update_content}
    response= requests.patch(apipath + "/update_posts/"+str(post_id), json=package)
    return response

def delete_posts(post_id):
    response = requests.delete(apipath+"/delete_post/"+str(post_id))
    return response

print(make_posts_test("post1","this is post1"))
print(make_posts_test("post1","this is post1"))
print(make_posts_test("post1","this is post1"))
print(make_posts_test("post1","this is post1"))