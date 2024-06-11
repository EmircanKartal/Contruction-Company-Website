import sqlite3
from tkinter import *
from tkinter import filedialog

root = Tk()

# File dialog to select files


def filedialogs():
    global get_image
    get_image = filedialog.askopenfilenames(title="SELECT IMAGE", filetypes=(
        ("png", "*.png"), ("jpg", "*.jpg"), ("Allfile", "*.*")))

# Image needs to be converted into binary before insert into database


def convert_image_into_binary(filename):
    with open(filename, 'rb') as file:
        photo_image = file.read()
    return photo_image

# Insert image into the database


def insert_image():
    project_id = 1  # Example project_id, replace with actual logic to get project ID
    image_database = sqlite3.connect("database.db")
    data = image_database.cursor()

    for image in get_image:
        insert_photo = convert_image_into_binary(image)
        data.execute("INSERT INTO Images (project_id, image) VALUES (?, ?)",
                     (project_id, insert_photo))

    image_database.commit()
    image_database.close()


select_image = Button(root, text="Select Image", command=filedialogs)
select_image.grid(row=0, column=0, pady=(100, 0), padx=100)

save_image = Button(root, text="Save", command=insert_image)
save_image.grid(row=1, column=0)

root.mainloop()
