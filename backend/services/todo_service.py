import repositories.todo_repository as repo

def list_todos():
    return repo.get_all()

def create_todo(text):
    return repo.add(text)

def toggle_todo(todo_id):
    return repo.toggle(todo_id)

def update_todo_text(todo_id, text):
    return repo.modify(todo_id, text)

def delete_todo(todo_id):
    return repo.delete(todo_id)
