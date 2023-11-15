
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

let clientIP;

async function handleRequest(request) {
  clientIP = request.headers.get("CF-Connecting-IP");
 // X-Forwarded-For = request.headers.get("X-Forwarded-For");
 // CF-Connecting-IP = request.headers.get("CF-Connecting-IP")
  return new Response(template(request.cf), {
    headers: { 'content-type': 'text/html' },
  })
  

}

function template(cf) {
  let array = [`are you anywhere near to ${cf.city}?`, `are you from ${cf.region}?`, `are you from ${cf.timezone} timezone?`];
  let random1 = array[Math.floor(Math.random() * array.length)];
  return `
  
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title></title>
      <link rel="stylesheet" href="https://unpkg.com/modern-css-reset/dist/reset.min.css" />
     
    </head>
    <body>
      <div class="container" >
        <h1>Hello Human! I am <a id="col" style="color:white">Namithesh</a>,  ${random1}</h1></br>
        
        <footer><small>© <script>document.write(new Date().getFullYear())</script> | Namithesh </small> | ${clientIP} </footer>
      </div>
      <style>
      body {
        background: #CC4646;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        font-family: sans-serif;
      }
      div.container {
        background: #CC4646;
        border-radius: 1rem;
        padding: 1rem;
      }
      a {
        color:inherit;
      }
      footer {
          text-align: center;
          padding-top: 30px
      }
    </style>
    </body>
  </html>
  `;
}
