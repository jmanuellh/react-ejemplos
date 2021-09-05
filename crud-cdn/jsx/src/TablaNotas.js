

const e = React.createElement;

export default class TablaNotas extends React.Component {
    state = {
        notas: [],
        nota: {}
    }

    constructor(props) {
      super(props);

      this.agregarNota = this.agregarNota.bind(this);
    }

    cambioFormNota = (event) => {
      this.setState(prevState => ({nota: {...prevState.nota, [event.target.name]: event.target.value}}));
    }

    obtenerNotas() {
      axios.get("https://erpbackaspnetcore31.azurewebsites.net/api/notas").then(r => {
        const notas = r.data;
        this.setState({notas});
      });
    }

    componentDidMount() {
      this.obtenerNotas();
    }

    agregarNota() {
    const nota = this.state.nota;

      axios.post("https://erpbackaspnetcore31.azurewebsites.net/api/notas", this.state.nota).then(() => {
        this.obtenerNotas();
      });
    }

    render() {
        return (
          <div>
            <form>
              <label for="input-titulo">Titulo</label>
              <input type="text" id="input-titulo" name="titulo" onChange={this.cambioFormNota} />
              <button type="button" onClick={this.agregarNota}>
                Enviar
              </button>
            </form>

            <table>
                <thead>
                  <tr>
                    <th>Titulo</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.notas.map(nota => (
                    <tr key={'tr-'+nota.id}>
                      <td>
                        {nota.titulo}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>

        );
    }
}


const domContainer2 = document.querySelector('#tabla_notas_container');
ReactDOM.render(e(TablaNotas), domContainer2);