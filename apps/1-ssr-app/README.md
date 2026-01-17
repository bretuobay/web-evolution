# The Server-Side Rendered (SSR) Application

Welcome to the 1990s! This application is a time capsule, built to demonstrate how web applications worked in the era of dial-up modems, server-side scripts, and full-page reloads. It uses Express.js and EJS templates to create a classic Server-Side Rendered experience, completely independent of client-side JavaScript for its core functionality.

## Historical Context: The Early Web

Before the rise of Single Page Applications (SPAs) and client-side JavaScript frameworks, the web was a simpler place. When you clicked a link, your browser sent a request to a server, which would then generate a *complete* HTML page and send it back. This is the essence of Server-Side Rendering.

This was the era of technologies like:
- **Perl CGI (Common Gateway Interface):** One of the earliest ways to generate dynamic content. A web server would execute a Perl script, and its standard output would be sent back as the HTML response.
- **PHP (Hypertext Preprocessor):** Became wildly popular for its simplicity. PHP code was embedded directly within HTML, making it easy to build dynamic pages.
- **Classic ASP (Active Server Pages):** Microsoft's answer to PHP, using VBScript or JScript on the server.
- **ColdFusion & JSP (JavaServer Pages):** Other popular choices in the corporate world.

In this model, the server did all the heavy lifting. The client (browser) was a "thin client," responsible only for rendering HTML and sending new requests.

### Life on Dial-Up

It's crucial to remember the constraints of the time. A "fast" internet connection might be 56kbps. This meant that sending large amounts of data was painfully slow. The classic SSR model was efficient in this context:
- **Small Payloads:** Sending pre-rendered HTML was often more efficient than sending raw data that a client would then have to process and render (which would have been impossible without powerful client-side scripting).
- **Server Power:** Servers had more processing power and memory than the average home computer. It made sense to centralize the application logic on the server.

## The Model-View-Controller (MVC) Pattern

This application is structured using the classic MVC pattern, a design paradigm that separates the application into three interconnected components. This was a revolutionary concept for organizing code in web applications.

```
User Action (e.g., HTTP Request)
       |
       v
+-------------+       +-----------------+       +---------------+
|   Router    |-----> |   Controller    |-----> |     Model     |
| (routes.ts) |       | (controller.ts) |       |  (database)   |
+-------------+       +-----------------+       +---------------+
       ^                     |                         ^
       | (Response)          | (Chooses View)          | (Data)
       |                     v                         |
       |              +-------------+                  |
       +--------------|     View      |<----------------+
                      |    (.ejs)     |
                      +-------------+
```

1.  **Model:** Represents the data and the business logic of the application. It's responsible for interacting with the database (fetching, creating, updating, deleting data). In our app, this is represented by the code in `src/models`, which connects to our database package.
2.  **View:** The presentation layer. This is the user interface. In our case, these are the `.ejs` template files in the `src/views` directory. The View's job is to display the data it receives from the Controller. It should not contain any business logic.
3.  **Controller:** The intermediary. It receives user input from the Router, interacts with the Model to fetch or modify data, and then tells the View which template to render and what data to display. Our controllers are in `src/controllers`.

## Advantages of "Classic" SSR

-   **Excellent SEO:** Search engine crawlers receive fully-formed HTML pages, making content easy to index.
-   **No JavaScript Dependency:** Core functionality works on any browser, regardless of JavaScript support. This was a major concern in the early 2000s.
-   **Simple Mental Model:** The request-response cycle is linear and easy to reason about. State management is straightforward (it's stored on the server, often in sessions).
-   **Fast "Time to First Byte":** The server sends a complete page, so the browser can start rendering as soon as it receives the first bit of data.

## Disadvantages of "Classic" SSR

-   **Poor User Experience:** The full-page reload for every interaction feels clunky and slow by modern standards. The white "flash" as the page reloads is a classic sign of this architecture.
-   **High Server Load:** The server has to render a complete HTML page for every single request, which can be resource-intensive.
-   **Wasted Bandwidth:** The entire layout (header, footer, etc.) is re-sent with every request, even if only a small part of the page content changes.
-   **Tightly Coupled:** The front-end and back-end are inherently linked. Changing the UI often requires a full redeployment of the entire application.

## The Modern SSR Renaissance vs. The Classic Era

Today, SSR is back in a big way with frameworks like Next.js, Nuxt.js, and SvelteKit. However, modern SSR is fundamentally different. It's often called "Universal" or "Isomorphic" SSR.

-   **Classic SSR:** The server renders HTML. The client is dumb.
-   **Modern SSR:** The server renders the initial HTML for a fast first-page load. Then, a client-side framework (like React or Vue) takes over in a process called "hydration." The application then behaves like a SPA, with no more full-page reloads.

Modern SSR aims to provide the best of both worlds: the SEO and initial load performance of classic SSR, with the rich, interactive user experience of a client-side SPA.

## Discussion Questions

1.  When is the "classic" SSR model still a good choice for a project today? (Consider internal tools, simple content sites, or environments with very low-powered client devices).
2.  How did the disadvantages of classic SSR directly lead to the rise of client-side libraries like jQuery, and eventually, full SPA frameworks like React and Angular?
3.  What are the trade-offs a development team makes when choosing between classic SSR, a pure SPA, and modern "hydrated" SSR?
