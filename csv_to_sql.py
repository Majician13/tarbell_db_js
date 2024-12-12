import pandas as pd
import sqlite3

# Load the CSV file into a pandas DataFrame
df = pd.read_csv("Combined.csv")
print("read Combined.csv")

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect("TarbellIndex.db")
print("created or ignored TarbellIndex.db")

# Write the DataFrame to a new SQL table named 'tarbell'
df.to_sql("tarbell", conn, if_exists="replace", index=False)
print("Task Complete!")

# Commit the changes and close the connection
conn.commit()
conn.close()