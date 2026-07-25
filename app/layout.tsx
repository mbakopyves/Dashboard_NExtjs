import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}


/**
 * Excellentes questions ! Je vais tout t'expliquer clairement.
🔹 1. Le type React.ReactNode pour children
children est un prop spécial en React qui représente le contenu inséré entre les balises d'un composant.
Que signifie React.ReactNode ?
C'est un type TypeScript qui signifie :
"Tout ce que React peut afficher"
Concrètement, children peut être :
• 
Du texte : "Bonjour"
• 
Un nombre : 42
• 
Un composant JSX : <Button />
• 
Un tableau : [<div>A</div>, <div>B</div>]
• 
null ou undefined
• 
Un Fragment : <>...</>
Exemple simple :
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

// Utilisation :
<Card>
  <h1>Titre</h1>  // <-- ceci est `children`
  <p>Contenu</p>   // <-- ceci aussi
</Card>
Donc dans ton RootLayout, children contiendra ta page entière (le composant Page de app/page.tsx).
🔹 2. Qui utilise RootLayout et comment les pages passent dans le body ?
Réponse : Next.js le fait AUTOMATIQUEMENT !
📁 Structure de ton projet :
app/
├── layout.tsx    ← Ton RootLayout (le wrapper)
└── page.tsx      ← Ta page d'accueil (le contenu)
🔄 Voici ce que Next.js fait sans que tu aies à l'écrire :
// Next.js génère ça en interne :
import RootLayout from '@/app/layout';
import Page from '@/app/page';

function App() {
  return (
    <RootLayout>
      <Page />  // <-- Passé comme `children` !
    </RootLayout>
  );
}
🎯 Résultat final rendu :
<html lang="en">
  <body>
    <main class="flex min-h-screen flex-col p-6">
      <div class="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        ...
      </div>
      ...
    </main>
  </body>
</html>
💡 En résumé
Élément
Rôle
layout.tsx
Template global (wrapper) avec <html>, <body>, etc.
page.tsx
Contenu de la page (passé automatiquement dans children)
children: React.ReactNode
Type TypeScript = "n'importe quel contenu React valide"
Next.js
Gère l'assemblage sans que tu aies à importer quoi que ce soit
Tu n'as pas besoin de faire l'import manuellement — c'est la magie de l'App Router de Next.js ! 🎩✨
 */

/**
 * Oui, tu es exactement sur un point **très important de Next.js avec l'App Router**. Ta confusion est normale, car ici Next.js fait quelque chose d'assez différent de React classique.

Prenons ton code :

```tsx
import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Il y a **deux choses à comprendre** :

1. Que signifie `React.ReactNode` ?
2. Qui appelle `RootLayout` et lui donne `children` ?

---

# 1. `children` est effectivement une prop

Tu as raison.

Ton composant reçoit un objet de props :

```tsx
function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
```

On pourrait écrire la même chose sans déstructuration :

```tsx
function RootLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
```

Donc :

```tsx
props.children
```

est simplement une propriété de l'objet `props`.

La syntaxe :

```tsx
{ children }
```

est une **déstructuration JavaScript/TypeScript**.

---

# 2. Mais que signifie `React.ReactNode` ?

C'est probablement le point qui te bloque.

Tu connais peut-être déjà des types comme :

```tsx
string
number
boolean
User
User[]
```

Ici :

```tsx
children: React.ReactNode
```

`React.ReactNode` est un type qui représente **tout ce que React est capable d'afficher comme contenu**.

Par exemple, un `ReactNode` peut être :

```tsx
"Bonjour"
```

ou :

```tsx
<h1>Hello</h1>
```

ou :

```tsx
<div>
  <h1>Hello</h1>
  <p>Bienvenue</p>
</div>
```

ou plusieurs éléments :

```tsx
<>
  <Header />
  <main>
    <HomePage />
  </main>
</>
```

Donc, dans ton cas :

```tsx
children: React.ReactNode
```

signifie essentiellement :

> `children` peut contenir n'importe quel contenu valide que React peut rendre.

---

# 3. Exemple avec React classique

Imaginons que tu as ce composant :

```tsx
function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>Mon Header</header>

      <main>
        {children}
      </main>

      <footer>Mon Footer</footer>
    </div>
  );
}
```

Et ailleurs :

```tsx
function App() {
  return (
    <Layout>
      <h1>Bienvenue</h1>
      <p>Voici ma page d'accueil.</p>
    </Layout>
  );
}
```

React comprend cela comme :

```tsx
Layout({
  children: (
    <>
      <h1>Bienvenue</h1>
      <p>Voici ma page d'accueil.</p>
    </>
  ),
});
```

Donc dans `Layout` :

```tsx
children
```

contient :

```tsx
<>
  <h1>Bienvenue</h1>
  <p>Voici ma page d'accueil.</p>
</>
```

Et quand tu fais :

```tsx
<main>
  {children}
</main>
```

tu obtiens :

```html
<main>
  <h1>Bienvenue</h1>
  <p>Voici ma page d'accueil.</p>
</main>
```

Jusqu'ici, c'est du **React classique**.

---

# 4. Maintenant, le cas particulier de Next.js

C'est ici que ça devient intéressant.

Tu dis :

> Je ne vois pas de fichier qui utilise `RootLayout` et fasse passer une page dans le `body`.

Et tu as raison.

Tu ne verras généralement **aucun code comme ceci** :

```tsx
<RootLayout>
  <HomePage />
</RootLayout>
```

Tu ne verras pas non plus :

```tsx
RootLayout({
  children: <HomePage />
});
```

Parce que **c'est Next.js qui s'en charge automatiquement**.

---

# 5. `layout.tsx` est un fichier spécial de Next.js

Dans l'App Router de Next.js, certains noms de fichiers ont une signification particulière.

Par exemple :

```text
app/
├── layout.tsx
├── page.tsx
├── about/
│   └── page.tsx
└── dashboard/
    ├── layout.tsx
    └── page.tsx
```

Next.js comprend automatiquement la structure de ton application.

Dans ton cas :

```text
app/
├── layout.tsx
└── page.tsx
```

Le fichier :

```text
app/layout.tsx
```

est ton **Root Layout**.

Le fichier :

```text
app/page.tsx
```

représente la page d'accueil `/`.

---

# 6. Imagine ce que Next.js fait derrière les coulisses

Supposons que ton `app/page.tsx` soit :

```tsx
export default function HomePage() {
  return (
    <h1>Bienvenue sur mon application</h1>
  );
}
```

Tu ne fais jamais toi-même :

```tsx
<RootLayout>
  <HomePage />
</RootLayout>
```

Mais conceptuellement, Next.js va construire quelque chose qui ressemble à :

```tsx
<RootLayout>
  <HomePage />
</RootLayout>
```

Et donc ton `children` devient :

```tsx
<h1>Bienvenue sur mon application</h1>
```

Ton layout :

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

va donc produire conceptuellement :

```html
<html lang="en">
  <body>
    <h1>Bienvenue sur mon application</h1>
  </body>
</html>
```

---

# 7. Le fonctionnement conceptuel

Ton application :

```text
app/
│
├── layout.tsx
│
└── page.tsx
```

Avec :

```tsx
// page.tsx

export default function HomePage() {
  return <h1>Bienvenue</h1>;
}
```

et :

```tsx
// layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

Next.js fait conceptuellement :

```text
                 Next.js
                    │
                    │ détecte
                    ▼
            app/layout.tsx
                    │
                    │ détecte
                    ▼
             app/page.tsx
                    │
                    ▼
             HomePage()
                    │
                    ▼
              <h1>Bienvenue</h1>
                    │
                    │ devient
                    ▼
               children
                    │
                    ▼
        <body>{children}</body>
```

Donc tu peux voir les choses ainsi :

```tsx
RootLayout(
  children = <HomePage />
)
```

Même si **tu n'écris jamais explicitement cet appel**.

---

# 8. Et pour les autres routes ?

Supposons que tu aies :

```text
app/
├── layout.tsx
├── page.tsx
│
├── about/
│   └── page.tsx
│
└── dashboard/
    ├── layout.tsx
    └── page.tsx
```

Tu as :

```text
/               → app/page.tsx
/about           → app/about/page.tsx
/dashboard       → app/dashboard/page.tsx
```

Pour `/about`, conceptuellement :

```tsx
<RootLayout>
  <AboutPage />
</RootLayout>
```

Pour `/dashboard` :

```tsx
<RootLayout>
  <DashboardLayout>
    <DashboardPage />
  </DashboardLayout>
</RootLayout>
```

On peut représenter ça comme un arbre :

```text
RootLayout
│
├── page.tsx
│
├── about
│   └── AboutPage
│
└── dashboard
    │
    └── DashboardLayout
        │
        └── DashboardPage
```

C'est ce qu'on appelle le **nested layouts** de Next.js.

---

# 9. Pourquoi Next.js fait ça automatiquement ?

C'est justement l'un des avantages de l'**App Router**.

Dans React classique, tu pourrais avoir :

```tsx
function App() {
  return (
    <RootLayout>
      <Router>
        ...
      </Router>
    </RootLayout>
  );
}
```

Mais dans Next.js, le système de fichiers devient une partie du système de routage.

Par exemple :

```text
app/
├── page.tsx
├── products/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
```

donne :

```text
/                       → page.tsx
/products               → products/page.tsx
/products/123           → products/[id]/page.tsx
/products/456           → products/[id]/page.tsx
```

Et Next.js sait automatiquement quels layouts doivent envelopper chaque page.

---

## Le point essentiel à retenir

Ton code :

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
```

signifie :

> Je crée un composant `RootLayout` qui accepte une prop appelée `children`, et cette prop peut contenir n'importe quel contenu rendu par React.

Ensuite :

```tsx
<body>{children}</body>
```

signifie :

> Je place le contenu reçu dans le `<body>`.

Mais **tu ne vois pas qui passe `children`**, car ce n'est pas toi qui fais l'appel.

C'est **Next.js qui reconnaît automatiquement `app/layout.tsx` comme le layout racine et qui injecte les pages appropriées dans `children`** selon la route demandée.

Donc mentalement, tu peux imaginer :

```tsx
// Ce code n'est pas écrit par toi.
// C'est une représentation conceptuelle du fonctionnement de Next.js.

<RootLayout>
  <PageCorrespondantÀLaRoute />
</RootLayout>
```

Et c'est cette mécanique qui explique pourquoi **`layout.tsx` est différent d'un composant React normal** : c'est à la fois un composant React, **et un fichier spécial reconnu et géré par le framework Next.js**.

 */