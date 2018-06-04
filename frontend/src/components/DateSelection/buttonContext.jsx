import React from 'react';
const ButtonContext = React.createContext({
  monthOfYear: [],
  dayOfMonth: [],
  dayOfWeek: [],
  hourOfDay: [],
  buttonHandler: () => {},
});

export default ButtonContext;
