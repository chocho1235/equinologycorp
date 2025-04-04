# Equinology - Enterprise Technology Solutions

Modern landing page showcasing enterprise AI and technology solutions.

## Features

- Interactive Neural Network Visualizer
- AI Assistant (Waleed)
- Draggable Code Window
- Performance Metrics Dashboard
- Smooth scrolling animations
- Interactive footer

## Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Deploying to Netlify

### Option 1: Direct Deployment via Netlify CLI

1. Install Netlify CLI globally:
   ```
   npm install -g netlify-cli
   ```

2. Build the project:
   ```
   npm run build
   ```

3. Deploy to Netlify:
   ```
   netlify deploy
   ```

4. Follow prompts to create a new site or select an existing one
5. To make the deployment live:
   ```
   netlify deploy --prod
   ```

### Option 2: Connecting to Git Repository

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign up or log in to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Select your Git provider and repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

## Configuration

The deployment configuration is specified in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects: All routes to index.html for SPA support

## Customization

- Update content in `src/App.tsx`
- Modify styling with Tailwind CSS classes
- Add new sections as needed 