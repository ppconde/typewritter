import "./App.css";
import { Fragment, createElement } from "react";
import HTML from "html-parse-stringify";
import Typewritter from "./typewritter";


interface INode {
  type: "tag" | "text" | "component";
  content: string;
  name: string;
  children: INode[];
  attrs: object;
}

// const answer = "<h1>Welcome to the Dummy HTML Page</h1>";
const answer = `<h1>Welcome to the Dummy HTML Page</h1>
  <p>This is a simple paragraph that introduces the content of this dummy HTML page. You can use this paragraph to provide some introductory information or description.</p>
  <p>Here is another paragraph with some <strong>bold text</strong> for emphasis. Bold text is often used to highlight important information or keywords.</p>
  <h2>Key Features</h2>
  <ul>
    <li>First Feature: <strong>Comprehensive</strong> and easy to understand.</li>
    <li>Second Feature: Includes <strong>important</strong> points and highlights.</li>
    <li>Third Feature: Organized into <strong>bullet points</strong> for clarity.</li>
  </ul>
  <button>Some random test btn</button>
<p>In conclusion, this dummy HTML page provides a basic structure that you can use as a template for creating more complex webpages.</p>`;

const parsedHtml: INode[] = HTML.parse(answer);

export default function App() {
  const renderElement = (node: INode) => {
    if (node.type === "text") {
      // Return the text content directly
      return node.content;
    } else if (node.type === "tag") {
      // Create a React element for tag nodes
      return createElement(
        node.name, // Tag name (e.g., 'div', 'p', etc.)
        { ...node.attrs }, // Spread attributes
        node.children && node.children.length > 0
          ? node.children.map((child, index) => (
            <Fragment key={index}>{renderElement(child)}</Fragment>
          ))
          : null
      );
    }
    return null; // Handle unexpected node types
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Typewritter delay={20}>
        {parsedHtml.map((node, index) => (
          <Fragment key={index}>{renderElement(node)}</Fragment>
        ))}
      </Typewritter>
    </div>
  );
}
