namespace Forum.Daos;

public interface IDao<T>
{
    void Add(T item);
    
    void Remove(T item);
    
    IEnumerable<T> GetAll();
}