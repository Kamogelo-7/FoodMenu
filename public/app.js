// Select the section where menu items will be displayed
const sectionCenter = document.querySelector(".section-center");
// Container where filter buttons will be displayed
const btnContainer = document.querySelector(".btn-container");

// Function to fetch menu items data from JSON file
const jsonMenuItemsData = async () => {
  try {
    // Fetch data from JSON file
    let res = await fetch("./foodItems.json");
    // Check if the response status is not 200 (OK)
    if (res.status !== 200) {
      throw new Error("Error fetching data");
    }
    let data = await res.json();

    // Display all items initially
    displayMenuItems(data);

    // Generate filter buttons
    displayMenuButtons(data);
  } catch (err) {
    console.log(err);
  }
};

// Function to display menu items
const displayMenuItems = (menuItems) => {
  let displayMenu = menuItems.map((item) => {
    return `
      <article class="menu-item">
        <img src=${item.img} alt=${item.title} class="photo" />
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class="price">R${item.price}</h4>
          </header>
          <p class="item-text">
            ${item.desc}
          </p>
        </div>
      </article>
    `;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
};

// Function to display filter buttons
const displayMenuButtons = (data) => {
  const categories = data.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  const categoryBtns = categories
    .map((category) => {
      return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
    })
    .join("");
  btnContainer.innerHTML = categoryBtns;

  // Select all filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Add event listeners to filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      const category = evt.currentTarget.dataset.id;
      const h1 = document.querySelector("h1");
      let menuCategory;
      if (category === "all") {
        h1.textContent = "food menu";
        menuCategory = data;
      } else {
        menuCategory = data.filter(
          (dataMenu) => dataMenu.category === category
        );
        h1.textContent = category;
      }
      displayMenuItems(menuCategory);
    });
  });
};

// Call the function to fetch and display menu items
jsonMenuItemsData();
