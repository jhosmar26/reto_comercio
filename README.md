# Minuto a minuto

Este proyecto está realizado en react sin librerias y con css modular.\
Los datos consultados son de la api [JSONPlaceholder](https://jsonplaceholder.typicode.com/) del cual se utiliza para obtener los posts y los nombres de los usuarios.

## Páginas

solo hay 1 página `Home` el cual contiene a la `cabecera` y se inseró una condicional para renderizar las publicaciones filtradas dependiendo de si el `buscador` esté vacío o no. También se añadió un spiner para dar sensación de respuesta mientras se ejecuta una petición al api.

Se colocó 2 `useEffect`. En el primero se verifica si hay un dato guardado en el localStorage nombrado como `lastTimeChecked` para compararlo con la hora actual, si la diferencia es de 3 minutos se limpia el localStorage. En la misma función se verifica en el localStorage por el dato de `usuarios` para insertarlos en el estado de las publicaciones, también se consulta por el nombre del usuario actual con su id.

En el segundo `useEffect` se observa el estado del buscador para mostrar o esconder el spiner de carga.

la función

## Componentes

Se separaron los siguentes componentes:

### `Header`

La `cabezera` o `header` envuelve al componente `buscador` conocido como `searcher`.\
Recibe como props a el estado de la busqueda y a su manejador para enviarlos al componente `buscador`.

### `Searcher`

Este componente recibe el estado y manejador de la busqueda para utilizarla en el input que renderiza.


### `Post`

Este componente recibe 3 props:\
-El título\
-La descripción\
-Y el usuario

también incluye un separador para marcar la diferencia entre los posts renderizados.

## API file

El archivo `api` exporta un objeto que contiene las funciones que harán la consulta al api de `JSONPlaceholder` y también se colocó una función para guardar la respuesta en el local storage de los posts de los usuarios.