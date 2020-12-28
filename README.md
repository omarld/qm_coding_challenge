
### Assumptions
1. Requirements had the field 'Name' as stand alone, but in table there is only First and Last Name. I assume this is a typo, so I don't have a Name predicate but instead only First and Last name.

### Things I would do different
2. More valition on user inputs. 
3. Sql Valition when contructing SQL statement.
4. UI Unit tests

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


### Time Tracking
**12/23/2020**
* 6 AM Initial Requirements Review
* 30 min
    * react project initial build
    * project planning (layout, ui components, data structure)
* 10 min
    * Creating Prodicate Service, Object mapping
* 40 min
    * Creating Dropdown component
    * wiring redux store
    * Created Main Session Search component, and imported Dropdown Component (basic wiring)

**12/24/2020**
* 6 AM Building Session Search Layout
* 1 hr 45 min 
    * Row Component layout
    * Dropdown select detection 

**12/25/2020**
* 6:10 AM start
* 30 min
    * Conitued Building Layout
* 1 hr 20 min
    * Adding Styles to Main App, Row and Dropdown, styling custom u li
    * adding Predicate Change selection handler to update UI

**12/27/2020**
* 10:30 AM 
* 1 hr 30 min 
    * row and button custom layout 12 PM
* 3hr
    * structuring for applying predicate

**12/28/2020**
* 7:30 AM start
* 2 hrs
    * creating results section
* 2 hr
    * building sql builder

* 1 hr 
    * finishing touches, cleanup


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
