import create from 'zustand';

interface StoreType{
  corpName: string | null;
  corpId: string | null;
  selectedKey: string;
  setCorpId: (corpId: string) => void;
  setCorpName: (corpName: string) => void;
  setSelectedKey: (selectedKey: string) => void;
}

const useStore = create<StoreType>(set => ({
  corpName: null,
  corpId: null,
  selectedKey: 'sales_qty',
  setCorpId: corpId => set(state => ({ ...state, corpId })),
  setCorpName: corpName => set(state => ({ ...state, corpName })),
  setSelectedKey: selectedKey => set(state => ({ ...state, selectedKey }))
}));

export default useStore;