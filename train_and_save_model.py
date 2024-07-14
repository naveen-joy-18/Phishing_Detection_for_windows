import pandas as pd #type:ignore
from sklearn.linear_model import LogisticRegression #type:ignore
import joblib #type:ignore

# Load the datasets
dataset = pd.read_csv('Dataset.csv')  # Update this path
labels = pd.read_csv('Target_Labels.csv')  # Update this path

# Assuming the dataset and labels are properly aligned and preprocessed
X = dataset.values
y = labels.values.ravel()  # Ensure labels are in the correct shape

# Train the logistic regression model
model = LogisticRegression()
model.fit(X, y)

# Save the model
joblib_file = "phishing_model_new.joblib"
joblib.dump(model, joblib_file)
print(f"Model saved as {joblib_file}")

# Extract model parameters
coefficients = model.coef_.tolist()[0]
intercept = model.intercept_.tolist()[0]

print("Coefficients:", coefficients)
print("Intercept:", intercept)
