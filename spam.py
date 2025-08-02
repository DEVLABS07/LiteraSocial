from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import Perceptron
import pandas as p

# Load dataset
db = p.read_csv("spam.csv")

# Usually in spam.csv, 'Category' is the label (spam/ham), 'Message' is the text
X_text = db["Message"]
y = db["Category"]

# Convert text to TF-IDF vectors
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(X_text)

# Create & train the model
model = Perceptron()
model.fit(X, y)

# Predict on a new message
while(True):
    message = input("Enter Your Mail:")
    if message.lower() == "exit":
        print("Exiting the Model.")
        break
    new_message = [message]
    new_message_vect = vectorizer.transform(new_message)
    prediction = model.predict(new_message_vect)
    print("Prediction:", prediction[0])

