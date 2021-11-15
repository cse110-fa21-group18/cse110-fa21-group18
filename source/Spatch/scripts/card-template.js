let index = 0;
const pastels = [
  '#E0BBE4',
  '#FEC8D8',
  '#FFDFD3'
];

class RecipeCard extends HTMLElement {
  constructor() {
    // Part 1 Expose - TODO
    super();
    this.attachShadow({mode: 'open'});
    // You'll want to attach the shadow DOM here
  }

  set data (data) {
    // This is the CSS that you'll use for your recipe cards
    const styleElem = document.createElement('style');
    const styles = `
      article {
        width: 400px;
        height: 600px;
        background-color: ` + pastels[index++] + `;
        text-align: center;
        padding-bottom: 40px;
        float: left;
        border-radius: 10px;
        margin-right: 20px;
      }

      img {
        border-radius: 5px;
        padding-top: 10px;
        width: 50%;
        text-align: center;
      }

      .title {
        font-size: 30px;
        font-weight: bold;
        text-decoration: underline;
      }

      .information {
        font-size: 24px;
      }

      article:hover {
        background-color: gray;
      }

      article:active {
        background-color: darkgray;
        width: 500px;
        height: 725px;
      }
    `;
    styleElem.innerHTML = styles;

    // Here's the root element that you'll want to attach all of your other elements to
    const card = document.createElement('article');

    // Some functions that will be helpful here:
    //    document.createElement()
    //    document.querySelector()
    //    element.classList.add()
    //    element.setAttribute()
    //    element.appendChild()
    //    & All of the helper functions below

    // Make sure to attach your root element and styles to the shadow DOM you
    // created in the constructor()

    console.log(data);

    // Part 1 Expose - TODO
    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(card);

    const img1 = document.createElement('img');
    img1.setAttribute('src', searchForKey(data, 'thumbnailUrl'));
    img1.setAttribute('alt', searchForKey(data, 'headline'));
    card.appendChild(img1);

    const p1 = document.createElement('p');
    p1.classList.add('title');
    p1.innerHTML = searchForKey(data, 'headline');
    card.appendChild(p1);

    const p2 = document.createElement('p');
    p2.classList.add('information');
    p2.innerHTML = data['@graph'][3]['description']
    card.appendChild(p2);

    card.addEventListener('click', clickFunction.bind(card));
  }
}

const clickFunction = (articleElement, e) => {
  articleElement
}


/*********************************************************************/
/***                       Helper Functions:                       ***/
/***          Below are some functions I used when making          ***/
/***     the solution, feel free to use them or not, up to you     ***/
/*********************************************************************/

/**
 * Recursively search for a key nested somewhere inside an object
 * @param {Object} object the object with which you'd like to search
 * @param {String} key the key that you are looking for in the object
 * @returns {*} the value of the found key
 */
 function searchForKey(object, key) {
  var value;
  Object.keys(object).some(function (k) {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === 'object') {
      value = searchForKey(object[k], key);
      return value !== undefined;
    }
  });
  return value;
}

function searchForKeyII(object, key) {
  var value;
  let first = true;

  Object.keys(object).filter
  Object.keys(object).some(function (k) {
    if (k === key) {
      if (first) {
        first = false;
      } else {
        value = object[k];
        return true;
      }
    }
    if (object[k] && typeof object[k] === 'object') {
      value = searchForKey(object[k], key);
      return value !== undefined;
    }
  });
  return value;
}

/**
 * Extract the URL from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the URL of
 * @returns {String} If found, it returns the URL as a string, otherwise null
 */
function getUrl(data) {
  if (data.url) return data.url;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Article') return data['@graph'][i]['@id'];
    }
  };
  return null;
}

/**
 * Similar to getUrl(), this function extracts the organizations name from the
 * schema JSON object. It's not in a standard location so this function helps.
 * @param {Object} data Raw recipe JSON to find the org string of
 * @returns {String} If found, it retuns the name of the org as a string, otherwise null
 */
function getOrganization(data) {
  if (data.publisher?.name) return data.publisher?.name;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Organization') {
        return data['@graph'][i].name;
      }
    }
  };
  return null;
}

/**
 * Converts ISO 8061 time strings to regular english time strings.
 * Not perfect but it works for this lab
 * @param {String} time time string to format
 * @return {String} formatted time string
 */
function convertTime(time) {
  let timeStr = '';

  // Remove the 'PT'
  time = time.slice(2);

  let timeArr = time.split('');
  if (time.includes('H')) {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == 'H') return `${timeStr} hr`;
      timeStr += timeArr[i];
    }
  } else {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == 'M') return `${timeStr} min`;
      timeStr += timeArr[i];
    }
  }

  return '';
}

/**
 * Takes in a list of ingredients raw from imported data and returns a neatly
 * formatted comma separated list.
 * @param {Array} ingredientArr The raw unprocessed array of ingredients from the
 *                              imported data
 * @return {String} the string comma separate list of ingredients from the array
 */
function createIngredientList(ingredientArr) {
  let finalIngredientList = '';

  /**
   * Removes the quantity and measurement from an ingredient string.
   * This isn't perfect, it makes the assumption that there will always be a quantity
   * (sometimes there isn't, so this would fail on something like '2 apples' or 'Some olive oil').
   * For the purposes of this lab you don't have to worry about those cases.
   * @param {String} ingredient the raw ingredient string you'd like to process
   * @return {String} the ingredient without the measurement & quantity 
   * (e.g. '1 cup flour' returns 'flour')
   */
  function _removeQtyAndMeasurement(ingredient) {
    return ingredient.split(' ').splice(2).join(' ');
  }

  ingredientArr.forEach(ingredient => {
    ingredient = _removeQtyAndMeasurement(ingredient);
    finalIngredientList += `${ingredient}, `;
  });

  // The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
  return finalIngredientList.slice(0, -2);
}

customElements.define('mini-card', RecipeCard);
