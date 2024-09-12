# Personal Portfolio Website V2

## Overview
This project is a modern, responsive personal portfolio website built with React. It showcases professional information, projects, and provides an admin interface for content management.

## Features
- **Instagram-style Profile Page**: Displays personal information and a curated list of projects.
- **Project Showcase**: Highlights various projects with descriptions, images, and links.
- **Blog Functionality**: Allows viewing and managing blog posts.
- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.

## Technologies Used
- React.js
- React Router for navigation
- SQLite for data storage
- Python Flask for backend API (if applicable)
- Tailwind CSS for styling
- Vercel for deployment
- Heroku for server hosting

## Installation and Setup
1. Clone the repository:
   ```
   git clone https://github.com/jeremiahwarinner/jeremiahwarinner.github.io.git
   cd jeremiahwarinner.github.io.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add necessary variables:
   ```
   REACT_APP_API_URL=your_api_url_here
   ```

4. Run the development server:
   ```
   npm start
   ```

5. Open `http://localhost:3000` to view the app in your browser.

## Building for Production
To create a production build:
```
npm run build
```

## Deployment
This project is configured for easy deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

### Vercel Configuration
Ensure you have a `vercel.json` file in your root directory with the following content:
```json
{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

## Project Structure
- `/src`: Source code
  - `/components`: React components
  - `/pages`: Main page components
  - `/styles`: CSS files (if not using CSS-in-JS)
- `/public`: Static files
- `/server`: Backend code (if applicable)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available under the [MIT License](LICENSE).
