<template>
    <header class="col-12 p-0">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="static/logo.svg" class="logo"/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="openFile">
                                <i class="fa fa-file"></i>
                                <span class="ms-2">Abrir</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="saveFile">
                                <i class="fa fa-save"></i>
                                <span class="ms-2">Salvar</span>
                            </a>
                        </li>
                        <!--
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false"> Dropdown </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data: function () {
        return {
            message: 'Lucas de oliveira'
        };
    },
    methods: {
        openFile: function () {
            console.log('sent-open-content');
            this.$emitter.emit('sent-open-content');
        },
        saveFile: function () {
            console.log('sent-save-content')
            this.$emitter.emit('sent-save-content');
        }
    }
}
</script>