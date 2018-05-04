import React from 'react';
import ReactDOM from 'react-dom';

import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

// An intermediate component that uses the ThemedButton
class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.toggleTheme = () => {
            console.log('hi!');
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };

        // State also contains the updater function so it will
        // be passed down into the context provider
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        };
    }

    render() {
        // The entire state is passed to the provider
        return (
            <ThemeContext.Provider value={this.state}>
                <ThemeTogglerButton />
            </ThemeContext.Provider>
        );
    }
}


export default UserProfile;