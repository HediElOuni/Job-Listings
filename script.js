const main = document.querySelector('main');
const filtersCont = document.querySelector('.filters-cont');
const filters = document.querySelector('.filters');
const clear = document.getElementById("clear");
const units = document.querySelectorAll('.unit');
const categories = document.querySelectorAll('.catgs .catg');
let slcFilters = [];

categories.forEach(function (category) {
    category.addEventListener('click', function () {
        if (!slcFilters.includes(category.textContent)) {
            updateFiltersUI(category);
        }
        filterUnits();
    });
});

function updateFiltersUI(category) {
    slcFilters.push(category.textContent);

    filtersCont.style.display = 'flex';
    main.style.paddingTop = '0';

    let clonedCatg = category.cloneNode(true);
    clonedCatg.classList.add("catg-slc");

    let clearBtn = document.createElement('button');
    clearBtn.textContent = '⨉';
    clearBtn.classList.add('clear-btn');

    let wrapperCatg = document.createElement('div');
    wrapperCatg.appendChild(clonedCatg);
    wrapperCatg.appendChild(clearBtn);
    wrapperCatg.classList.add('wrapper-catg');
    filters.appendChild(wrapperCatg);

    clearBtn.addEventListener('click', function () {
        this.parentElement.remove();
        slcFilters.splice(slcFilters.indexOf(category.textContent), 1);
        filterUnits();

        if (!filters.hasChildNodes()) {
            filtersCont.style.display = 'none';
            main.style.paddingTop = '75px';
        }
    });
}

function filterUnits() {
    units.forEach((unit) => {
        let unitCatgsArray = [];
        let unitCatgs = unit.querySelectorAll('.catgs .catg');
        unitCatgs.forEach((catg) => {
            unitCatgsArray.push(catg.textContent);
        });
        function isFilterIncluded(subset, superset) {
            return subset.every(elem => superset.includes(elem));
        }
        if (!isFilterIncluded(slcFilters, unitCatgsArray)) {
            unit.style.display = 'none';
        } else {
            unit.style.display = 'flex';
        }
    });
}

clear.addEventListener('click', () => {
    filters.innerHTML = "";
    slcFilters.length = 0;
    filterUnits();

    filtersCont.style.display = 'none';
    main.style.paddingTop = '75px';
})

units.forEach((unit) => {
    function findElementWithClass(element, className) {
        if (element.classList && element.classList.contains(className)) {
            return element;
        }
        let foundElement = null;
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            foundElement = findElementWithClass(children[i], className);
            if (foundElement) {
                return foundElement;
            }
        }
        return null;
    }
    const ftrTag = findElementWithClass(unit, 'ftr');
    if (ftrTag) {
        unit.classList.add('unit-ftr');
    }
});

function isSmallScreen() {
    return window.matchMedia("(max-width: 480px)").matches;
}

if (isSmallScreen()) {
    filtersCont.style.padding = "15px 5px";
}