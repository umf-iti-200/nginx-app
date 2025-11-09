const $form = document.getElementById("form-name");
const $result = document.getElementById("result");

async function submit(event) {
    event.preventDefault();

    const name = $form.querySelector("#name").value;

    const response = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    })

    const payload = await response.json();

    $result.innerText = payload.message;

    return false;
}

$form.addEventListener("submit", submit);