export function changeThemeHTML(darkTheme) {
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
  }

  if (darkTheme) {
    setTheme("dark")
  } else {
    setTheme("light")
  }
}
