class Todo:
    def __init__(self, id, text, done=False):
        self.id = id
        self.text = text
        self.done = done

    def to_dict(self):
        return {"id": self.id, "text": self.text, "done": self.done}
