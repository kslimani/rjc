# Remote Javascript console

Yet another remote Javascript console.

## Installation

From NPM :

```shell
$ npm install -g rjc
```

## Usage

Let's suppose the IP address of the machine running the server is `192.168.1.5`.

Run the server (use -h for help) :

```shell
$ rjc -a 192.168.1.5
```

Then open `http://192.168.1.5:8080` in your browser to display remote console homepage.

Finally, insert the displayed script tag in your application. For example :

```html
<script src="http://192.168.1.5:8080/console.js"></script>
```

## Limitations

When sending object via socket.io, they are serialized into JSON which only retains the properties of the object. The type of the object and the methods are not retained.
