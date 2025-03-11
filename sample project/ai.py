import openai

# Set your OpenAI API key
api_key = "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

# Call the OpenAI API
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Tell me a joke."}
    ],
    temperature=0.7
)

# Print the response
print(response["choices"][0]["message"]["content"])
