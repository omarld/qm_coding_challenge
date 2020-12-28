
### Notes

* Mapped Predicate to type and condition
    * 'between' needs 'is' and 'and' additional conditions
* Added Redux
* SQL Object
    * Predicate
    * Clause : Object with an arrays of conditions
        * Conditions []
            * Operator
* Using Flex CSS
    * Each item within row is content justified to space between
* Service
    * return list of available predicates along with its corresponding types 

### Questions
1.

### Time Tracking
**12/23/2020**
* 6 AM Initial Requirements Review
* 6:30 AM 
    * react project initial build
    * project planning (layout, ui components, data structure)
* 6:50 AM
    * Creating Prodicate Service, Object mapping
* 7:30 AM
    * Creating Dropdown component
    * wiring redux store
    * Created Main Session Search component, and imported Dropdown Component (basic wiring)
* 8:10 AM Stopped

**12/24/2020**
* 6:05 AM Building Session Search Layout
    * 6:15 AM Row Component layout
    * Dropdown select detection
* 8 AM Stopped 

**12/25/2020**
* 6:10 AM Conitued Building Layout
* 6:40 AM Adding Styles to Main App, Row and Dropdown, styling custom u li
* 8 AM adding Predicate Change selection handler to update UI

**12/27/2020**
* 10:30 AM row and button custom layout 12 PM
* 12 PM 4 PM - structuring for applying predicate

**12/28/2020**
* 7:30 AM creating results section

NEXT
* Adding redux devtools extension
* Create Session Search Layout

### `npm start`

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
