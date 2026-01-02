# Ledger

A pixel-perfect, high-performance news application built with a focus on clean modular architecture and real-time data integration. This project demonstrates advanced CSS layout techniques (Grid & Flexbox), asynchronous JavaScript, and the handling of production-level API restrictions.

## Live Demo

*Note: Due to API provider security policies, live news fetching is restricted to local environments. See the [API Deployment Limitations](https://www.google.com/search?q=%23-api-deployment-limitations) section for details. [Click here to see the news portal anyway.](https://thisislefa.github.io/Ledger)*

## Interface Preview

This preview showcases the comprehensive news feed as rendered in a local development environment. On production domains, the system is engineered to detect API security restrictions and provide an informative diagnostic message in place of this live feed.

<img width="1920" height="4866" alt="Ledger" src="https://github.com/user-attachments/assets/cd72c2f9-9d2a-4585-9474-d151f2a362dd" />

## Features

* **Real-Time Data**: Integrates with the News API to fetch the latest global headlines across multiple categories (Business, Tech, Sports, etc.).
* **Dynamic Content Rendering**: Uses JavaScript to map and inject API responses into complex layouts without the overhead of a heavy framework.
* **Advanced Typography**: Optimized for readability using a combination of **Poppins** for bold headings and **Inter** for clean body text.
* **Responsive Design**: A mobile-first approach ensuring a seamless experience across desktop, tablet, and mobile devices.
* **SVG-Powered UI**: Zero external icon dependencies. All arrows and interactive elements use inline SVGs for maximum performance and crispness at any resolution.
* **Contextual Fallbacks**: Implements a graceful error-handling system that detects deployment environments and provides actionable debugging steps to the user.

## Technical Stack

**HTML5**: Semantic structure for SEO and accessibility.
**CSS3 (Advanced)**:
* Custom CSS Variables for design system consistency.
* Complex CSS Grid for the Hero and News sections.
* `clamp()` and relative units for fluid typography.
* Keyframe animations for loading and error states.


**JavaScript (ES6+)**:
* `Async/Await` for non-blocking API calls.
* `DOM Manipulation` for dynamic UI updates.
* `Date` and `Time` utility functions for relative timestamps.



## API Deployment Limitations

This project utilizes the **News API** Developer Plan. To ensure you can view the live data, please be aware of the following:

1. **Localhost Restriction**: The API provider restricts client-side requests to `localhost` for free-tier users.
2. **CORS Policy**: Requests made from production domains (like `github.io` or `vercel.app`) are blocked to prevent API key abuse.
3. **Fallback State**: If you view the project online, the built-in `handleError()` function will detect the restriction and display a detailed, left-aligned guide on how to run it locally.

## Local Setup Instructions

To experience the full functionality with live data, follow these steps:

1. **Clone the Repository**:
```bash
git clone https://github.com/thisislefa/Ledger.git
cd Ledger

```


2. **Get an API Key**:
* Sign up at [NewsAPI.org](https://newsapi.org/).
* Copy your unique API Key.


3. **Configure the Key**:
* Open `index.html`.
* Find `const API_KEY = '...'` and paste your key inside the quotes.


4. **Launch with Live Server**:
* Open the project in VS Code.
* Install the **Live Server** extension.
* Right-click `index.html` and select **"Open with Live Server"**.



## Project Structure

```text
├── index.html   # Main structure and logic (Modern Grid/Fetch)
├── styles.css  # Custom design system and responsive rules
└── assets/     # Images and static resources

```

## License

Distributed under the MIT License.

---

*Created as part of my professional development portfolio.*
