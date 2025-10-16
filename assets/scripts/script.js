function showTab(tabId) {
  const allTabs = document.querySelectorAll(".tab-content");
  allTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  const allButtons = document.querySelectorAll(".nav-item");
  allButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  const activeBtn = document.querySelector(
    `.nav-item[onclick="showTab('${tabId}')"]`
  );
  if (activeBtn) {
    activeBtn.classList.add("active");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  showTab("about");
});
