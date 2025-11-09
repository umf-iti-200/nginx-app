const $form = document.getElementById("form-name");
const $formSubmitButton = document.querySelector("[type=submit]");
const $result = document.getElementById("result");

console.log($formSubmitButton);
async function submit(event) {
    event.preventDefault();

    $formSubmitButton.disabled = true;
    $result.innerText = "Submitting...";

    const name = $form.querySelector("#name").value;

    const response = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    })

    const payload = await response.json();

    $formSubmitButton.disabled = false;
    $result.innerText = payload.message;

    return false;
}

$form.addEventListener("submit", submit);
