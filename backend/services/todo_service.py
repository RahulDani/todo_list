import repositories.todo_repository as repo

def list_todos(user_id):
    return repo.get_all(user_id)

def create_todo(text, user_id):
    return repo.add(text, user_id)

def toggle_todo(todo_id, user_id):
    return repo.toggle(todo_id, user_id)

def update_todo_text(todo_id, text, user_id):
    return repo.modify(todo_id, text, user_id)

def delete_todo(todo_id, user_id):
    return repo.delete(todo_id, user_id)
