import joblib #type:ignore

# Load the trained model
model = joblib.load('phishing_model.joblib')

# Extract model parameters
coefficients = model.coef_.tolist()[0]
intercept = model.intercept_.tolist()[0]

print("Coefficients:", coefficients)
print("Intercept:", intercept)
