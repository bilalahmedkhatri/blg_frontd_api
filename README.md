## Getting Started

### Prerequisites

*   **Backend:**
    *   Python 3.10+
    *   pip
    *   virtualenv (recommended)
    *   PostgreSQL or MySQL (or your preferred database)
*   **Frontend:**
    *   Node.js (LTS version recommended)
    *   npm (or yarn)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/bilalahmedkhatri/blg_frontd_api.git
    cd my-awesome-blog
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    virtualenv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py createsuperuser # Create an admin user
    ```
    Edit the `settings.py` file to configure the database and `SECRET_KEY`.

3.  **Frontend Setup:**

    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Backend:**
    In the `backend` directory.
    Make sure virtual environment is activated.
    ```bash
    python manage.py runserver
    ```
    The backend will be running at `http://127.0.0.1:8000/`.

2.  **Frontend:**
    In the `frontend` directory:
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:5173/`.

### Environment Variables

*   **Backend:**
    *   `SECRET_KEY`: Django secret key.
    *   `DEBUG`: Django debug mode (set to `False` in production).
    *   You might need additional environment variables for email configuration, third-party services, etc.
*   **Frontend:**
    *   `REACT_APP_API_BASE_URL`: The base URL of your backend API (e.g., `http://127.0.0.1:8000/api`).

## Contributing

If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them: `git commit -m "Add some feature"`
4.  Push to the branch: `git push origin feature/your-feature-name`
5.  Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

*   [Django](https://www.djangoproject.com/)
*   [Django REST Framework](https://www.django-rest-framework.org/)
*   [DRF-SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/)
*   [React](https://reactjs.org/)
*   [React Router](https://reactrouter.com/)
*   [Vite](https://vite.dev/)
*   [Material UI](https://mui.com/)
*   [Axios](https://axios-http.com/)
*   [MUI-Tiptap](https://mui-tiptap.dev/)
*   [Tiptap Editor](https://tiptap.dev/)

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
