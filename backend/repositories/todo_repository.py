from models.todo import Todo

todos = []

def get_all():
    return [todo.to_dict() for todo in todos]

def add(text):
    todo = Todo(len(todos) + 1, text)
    todos.append(todo)
    return todo.to_dict()

def toggle(todo_id):
    for todo in todos:
        if todo.id == todo_id:
            todo.done = not todo.done
            return todo.to_dict()
    return None

def modify(todo_id, text):
    for todo in todos:
        if todo.id == todo_id:
            todo.text = text
            return todo.to_dict()
    return None

def delete(todo_id):
    global todos
    todos = [t for t in todos if t.id != todo_id]
    return True
