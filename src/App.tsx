import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { addItem, getData, getDictionary } from './data';
import { Table } from './table/Table';
import moment from 'moment';

function App() {
  const ref = useRef<() => void>(() => {});
  const formik = useFormik({
    initialValues: { str: 'Новая строка', num: 23, date: new Date().toISOString().split('T')[0], enum: null as null | string },
    async onSubmit(data) {
      const enm = data.enum;
      
      if(!enm) {
        return;
      }

      await addItem({ ...data, date: new Date(data.date), enum: enm });
      formik.setValues({ str: 'Новая строка', num: 23, date: new Date().toISOString().split('T')[0], enum: null as null | string });
      ref.current();
    },
  });
  const [dictionary, setDictionary] = useState<string[]>([]);

  useEffect(() => {
    getDictionary().then(setDictionary);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'max-content 1fr' }}>
      <form onSubmit={formik.handleSubmit}>
        <input placeholder='Строка' {...formik.getFieldProps('str')}/>
        <input placeholder='Число' type="number" {...formik.getFieldProps('num')}/>
        <input placeholder='Дата' type="date" {...formik.getFieldProps('date')}/>
        <select {...formik.getFieldProps('enum')}>
          <option selected disabled>Перечисления</option>
          {dictionary.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <button type="submit">Добавить</button>
      </form>
      <Table
        ref={ref}
        columns={[
          {
            key: 'str',
            title: 'Строки',
            type: 'str',
            render: (data) => data.str
          },
          {
            key: 'num',
            title: 'Числа',
            type: 'num',
            render: (data) => data.num
          },
          {
            key: 'date',
            title: 'Даты',
            type: 'date',
            render: (data) => moment(data.date).format('DD.MM.YY hh:mm:ss:ms')
          },
          {
            key: 'enum',
            title: 'Перечисления',
            type: 'enum',
            values: ['First enum', 'second enum', 'other enum'],
            render: (data) => data.enum
          },
        ]}
        getData={async (params) => {
          const { totalRows, totalFiltredRows, data } = await getData(params);
          return { totalRows, totalFiltredRows, data };
        }} 
      />
    </div>
  )
}

export default App
