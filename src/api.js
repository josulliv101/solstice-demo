// An extremely simple api to fetch data
// All server api endpoints map to the mock utility data
export default function api(endpoint) {
  return (
    fetch(endpoint)
      .then(resp => resp.json())
      .catch((e) => console.log('err', e))
  )
}