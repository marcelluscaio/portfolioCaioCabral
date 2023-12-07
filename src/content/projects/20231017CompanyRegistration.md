---
title: "Company registration"
summary: "A single page application where the user can create, update, display and delete companies from the database. The project was thoroughly tested for accessibility, allowing full zoom and bigger default font-sizes."

purpose: "The project was built for a technical assessment. I was asked to create a CRUD based on the companies' backend, and they also provided me with a Figma file."

technologyChoice: "I chose to work with Next.js because it is a technology I was exploring and wanted to create more projects with. I also thought that working with SSR could improve the application performance.

The company required the use of a CSS preprocessor, so I chose Sass, with which I really like working, mainly for the @extends and @mixin functionalities."

highlights: "I added some interactions to the original design, like the flying label on the input, as well as focus and hover indicators. I used Sass @mixin to make the addition of :hover and :focus-visible more efficient and maintainable.

The modal uses the browser API, with the native 'showModal()'. To achieve that I had to  the useRef hook. Using that technique I was able to avoind interaction with the rest of the page when modal is openm which makes keyboard navigation much easier. The modal text also varies according to the context in which it is opened.
"
challenges: "One of the main challenges here was time management. I had a few days to build the project, so it required planning some important decisions on what to focus, and what to postpone.

Another challenge was managing state. All components are connected: filter, list and modal, so I had to make sure they were all using and updating the same data.
"
lessonsLearned: "On this project I learned a lot about Next.js and the app router. I had a deeper understanding of the difference between server and client components, as well as how Next.js optimizes images and fonts.

I also learned a lot about TypeScript and how it can help us catch errors during development, as well as making a lot of progress on my Sass skills.
"
image1: "../../assets/images/screen.webp"
altImage1: "Imagem"
image2: "../../assets/images/screen.webp"
altImage2: "Imagem"
technologies: ["Next.js", "React", "Sass", "TypeScript"]
githubUrl: "https://github.com/marcelluscaio/CadastroEmpresa"
projectUrl: "https://caiocabral-cadastroempresa.vercel.app/"
isOnMain: true
date: 17/10/2023
---

O projeto deve ter:
Summary - Descricao geral citando alguma caracteristica interessantes,
Purpose - Por que fiz, e onde exatamente participei

Technology Choice - Que tecnologias escolhi e por que^
Highlights - Caracteristicas interessantes

desafios enfrentados,
conclusao/aprendizados

Incluir imagens e textos alternativos, Desenvolver texto descritivo. No futuro, tirar referências à OPEA
