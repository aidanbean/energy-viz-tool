import { ThemeContext } from "./theme-context.js";
import React from "react";

class ThemeTogglerButton extends React.Component {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <button
            onClick={toggleTheme}
            style={{ backgroundColor: theme.background }}
          >
            Toggle Theme
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default ThemeTogglerButton;
