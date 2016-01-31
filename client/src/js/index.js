import React from 'react';
import ReactDOM from 'react-dom';
import routes from './app/routes';

// Import jquery
import 'jquery/dist/jquery.min';

// Import Firebase
import 'firebase';

// Import Materialize CSS
import 'materialize-css/dist/js/materialize';
import 'materialize-css/dist/css/materialize.css';

ReactDOM.render(routes, document.getElementById('app'));
