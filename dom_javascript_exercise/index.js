const container = document.querySelector("#container");
const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";
container.appendChild(content);

const redPara = document.createElement("p");
redPara.textContent = "Hey I am red!"
redPara.style.color = "red"
container.appendChild(redPara);

const blueH3 = document.createElement("h3");
blueH3.textContent = "I'm a blue H3";
blueH3.style.color = "blue"
container.appendChild(blueH3);

const pinkDiv = document.createElement("div");
pinkDiv.setAttribute("style", "background-color: pink; border: 1px solid black");
const innerH1 = document.createElement("h1");
innerH1.textContent = "I'm inside a div";
const innerP = document.createElement("p");
innerP.textContent = "Me too!";
pinkDiv.appendChild(innerH1);
pinkDiv.appendChild(innerP);
container.appendChild(pinkDiv);

function alertFunction() {
  alert("YAY! YOU DID IT!");
}
const btn = document.querySelector("#btn");
btn.addEventListener("click", function (d) {
  d.target.style.color = "red";
});
