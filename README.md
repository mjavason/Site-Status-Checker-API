# Site Status Checker API

A simple yet powerful API for monitoring website statuses in real-time, helping you ensure seamless user experiences and proactively address potential downtime. The API is currently live at [Site Status Checker](https://site-status-checker-l46c.onrender.com).

## Overview

The Site Status Checker API is designed to monitor and report the operational status of websites in real-time. It automates the process of checking website availability and responsiveness, providing critical information to keep your online presence robust and reliable.

## Getting Started

To set up and use the Site Status Checker API, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/mjavason/Site-Status-Checker-API.git
   ```

2. Navigate to the project directory:

   ```shell
   cd Site-Status-Checker-API
   ```

3. Install the required dependencies:

   ```shell
   npm install
   ```

4. Set up the environment variables by creating a `.env` file in the root directory. Replace the placeholders with your actual values. Refer to the "Environment Variables" section below for details.

5. Start the server:

   ```shell
   npm start
   ```

The API will be accessible at `http://localhost:5000` by default.

## Features

- **Real-Time Website Status**: Monitor and report website operational status instantly.

- **Automated Checks**: Automate the process of checking website availability and responsiveness.

- **Customizable Intervals**: Configure monitoring intervals to match your specific needs.

## Environment Variables

Before running the API, ensure you have set up the following environment variables in your `.env` file:

```env
ACCESS_TOKEN_SECRET=your-access-token-secret
API_DOCUMENTATION_URL=doc.xxx.com
APP_NAME=TemplateApp
JWT_SECRET=user
MAIL_ADDRESS=xxxx@mail.com
MAIL_PASSWORD=xxxx
MONGODB_URL=xxxx
MONGO_DB_NAME=xxxx
REFRESH_TOKEN_SECRET=xxxx
SITE_LINK=xxxx
USERNAME=user@mail.com
```

Replace the placeholders with your actual secret keys, URLs, and credentials.

## Documentation

For detailed documentation on how to use the Site Status Checker API and its endpoints, refer to the [API Documentation](https://documenter.getpostman.com/view/29278179/2s9YJgSzoB).

## Contributing

Contributions to the Site Status Checker API are welcome! If you'd like to contribute:

1. Fork the project on GitHub.

2. Create a new branch for your changes.

3. Make your improvements or additions.

4. Thoroughly test your changes.

5. Create a pull request with a clear description of your changes.

Your contributions are highly appreciated and will help improve the functionality and reliability of the API.
