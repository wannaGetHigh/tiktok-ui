import Header from '../components/Header';

function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="conainter">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnly;
