import React, { Component, FC, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';

interface Param {
  id: number;
  name: string;
  type?: 'string';
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}
interface Color {
  color: string
}

const params =
  [
    {
      "id": 1,
      "name": "Назначение"
    },
    {
      "id": 2,
      "name": "Длина"
    }
  ]
const model =
{
  paramValues: [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    }
  ],
}

interface State {
  params: Param[];
  model: Model;
  isData: boolean
}

export default class ParamEditor extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      model,
      params,
      isData: false
    }
    this.getModel = this.getModel.bind(this)
  }

  getModel(): Model {
    const data = this.state.model
    return data;
  }

  showData = () => {
    this.setState(prevState => ({
      ...prevState, isData: !this.state.isData,
    }))
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {

    let arr = this.state.model.paramValues
      .map((item) => {
        if (idx + 1 === item.paramId) {
          return {
            paramId: item.paramId,
            value: e.target.value,
          }
        } else {
          return item
        }
      })

    this.setState(prevState => ({
      ...prevState, model: {
        ...prevState.model, paramValues: arr
      }
    }))
  }

  render() {

    const newData = this.getModel()

    const { paramValues } = this.props.model;
    const isData = this.state.isData

    return (
      <div>
        <EditForm
          params={params}
          paramValues={paramValues}
          newData={newData}
          handleChange={this.handleChange}
          showData={this.showData}
          isData={isData}
        />
      </div>
    )
  }
}

interface EditFormProps {
  params: Param[];
  paramValues: ParamValue[];
  newData: Model;
  handleChange: Function;
  showData: MouseEventHandler;
  isData: boolean;
}

const EditForm: FC<EditFormProps> = (props) => {

  const { params, paramValues, newData,
    handleChange, showData, isData } = props;

  return (
    <>
      <form>
        {
          params.map((item, idx) => {
            return (
              <label key={idx}>
                {item.name}
                <input
                  onChange={(e) => handleChange(e, idx)}
                  defaultValue={paramValues.find(p => p.paramId === item.id)?.value}
                  name={`${item.id}`}
                />
              </label>
            )
          })
        }
        <br />
        <button
          onClick={showData}
          type='button'
        >Получить новые данные</button>
      </form>
      {
        isData && <DataModel newData={newData} />
      }
    </>
  )
}

interface DataModelProps {
  newData: Model
}

const DataModel: FC<DataModelProps> = (props) => {

  const { newData } = props;



  return (
    <>
      <h1>Новые данные</h1>
      <ul>
        {
          newData.paramValues.map((item, idx) => {
            return (
              <li key={idx}>
                <p>paramId - {item.paramId} value - '{item.value}'</p>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

ReactDOM.render(
  <ParamEditor params={params} model={model} />,
  document.getElementById('root')
)
