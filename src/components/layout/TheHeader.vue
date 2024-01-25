<template>
    <header>
        <nav>
            <div class="img-container">
                <img src="@/assets/logo.png" alt="" class="logo-img" />
                <router-link class="evo-tag" to="/ticket">EVOLUTION</router-link>
                <img src="@/assets/plane.png" alt="" class="plane-img" />
            </div>
            <div class="nav-links">
                <ul>
                    <li>
                        <router-link to="/ticket" class="special-link">Plane Ticket</router-link>
                    </li>
                    <button>...</button> <!--Aşağı doğru farklı linkler açılacak-->
                    <li>
                        <router-link to="/login" class="special-link">Login</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>


<style scoped>
header {
    width: 100%;
    background-color: #0366a8;
}

header nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

li {
    margin: 0 0.5rem;
}

header a {
    text-decoration: none;
    color: rgb(255, 255, 255);
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
}

.special-linl:active,
.special-link:hover,
.special-link.router-link-active {
    border: 1px solid #f391e3;
}

.img-container {
    display: flex;
    align-items: center;
}

.evo-tag {
    font-style: italic;
    font-size: 35px;
    border-color: transparent;
    font-weight: bolder;
    color: rgb(187, 22, 91);
    padding: 0;
    margin: 0 30px 0 10px;
}

.logo-img {
    width: 40px;
    height: auto;
}

.plane-img {
    width: 100px;
    height: auto;
}

button {
    background: transparent;
    border-color: transparent;
    color: rgb(255, 255, 255);
    font-size: 25px;
    cursor: pointer;
    margin: 0 100px 10px 0;
}
</style>