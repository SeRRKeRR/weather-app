export async function getCityApi(city) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${city}&format=json&addressdetails=1&limit=1`)
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
